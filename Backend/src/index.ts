import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import multer from 'multer';
import { Token } from './Decoder'
import path from 'path';
import fs from 'fs'
import {google} from 'googleapis'
import dotenv from "dotenv";
import * as crypto from "crypto";


const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors({ origin: 'http://localhost:5173' }));
 const corsOptions ={
    origin:'*', 
    credentials:true, //access-control-allow-credentials:true
     optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

app.use(bodyParser.json());
interface CustomRequest extends Request {
  userData?: {
      email: string;
      name: string;
  };
}
const storage = multer.diskStorage({
    destination: (req:CustomRequest, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req:CustomRequest, file, cb) => {
       
        const filename = (req.userData?.email??file.originalname)+file.originalname
        cb(null, filename);
    },
});
const uploadStorage = multer({ storage: storage });

const verifyToken = (req: any, res: any, next: any) => {
   
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, process.env.SECRET_KEY as string, (err: any, user: any) => {
            if (err) {
                
                res.sendStatus(403)
            }
            else {
                console.log("token valid")
                next()
            }
        })
    }
    else {
        res.sendStatus(403)
    }
}
console.log("testing")
app.post('/', async (req, res) => {
    const { name, email, password } = await req.body;

    try {
      console.log("request came",name)
        const token = await jwt.sign({ name, email }, process.env.SECRET_KEY as string);
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        console.log("db updated")
        res.json({ token });
    }
    catch (error) {
        res.json(error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            if (user.password === password) {
                const token = await jwt.sign(
                    { name: user.name, email: user.email },
                    process.env.SECRET_KEY || "gfg"
                );
                res.json({ token });
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
});

app.post(
  "/Upload",
  verifyToken,
  Token,
  uploadStorage.single("file"),
  async (req: CustomRequest, res: Response) => {
    const uploadedFile: Express.Multer.File | undefined = req.file;
    if (!uploadedFile) {
      res.status(400).json({ message: "No file" });
      return;
    } else {
      try {
        await prisma.videos.create({
          data: {
            name: uploadedFile.filename,
            url: `../uploads/${uploadedFile.filename}`,
            author: {
              connect: {
                email: req.userData?.email ?? "something@gmail.com",
              },
            },
          },
        });
        res.json({
          status: 200,
          message: "file uploaded successfully",
        });
      } catch (error) {
        res.status(500).json({ error: "Error uploading file" });
      }
    }
  }
);


const uploadDirectory = path.join(__dirname, '..', 'uploads');

app.get('/Videos',verifyToken,Token,async (req: CustomRequest, res: Response) => {

    const videos=await prisma.videos.findMany({
        where:{
            author:{
                email:req.userData?.email
            }
        }
    })
    console.log("video acesss",videos)
    res.json(videos)

    // if (!fs.existsSync(uploadDirectory)) {
    //     console.log('Upload directory does not exist');
    //     return;
    // }
    // fs.readdir(uploadDirectory, (err, files) => {
    //     if (err) {
    //         console.log("video didnt acesss",uploadDirectory)
    //         return res.status(500).send('Error reading upload directory');
    //     }
    //     console.log(files)
        
    //     const videos = files.filter(file => {
    //         const extension = path.extname(file).toLowerCase();
    //         return ['.mp4', '.avi', '.mkv', '.mov', '.wmv','.MOV'].includes(extension);
    //     });

        
        // res.json(videos);
    // });
});

app.get("/Account", verifyToken, Token,(req: CustomRequest, res: Response) => {
   
  const name = req.userData?.name;
  const email = req.userData?.email;
  res.json({ name, email});
});

app.post('/reset', async (req, res) => {
    const { email,password } = req.body ;
    try {
        const user = await prisma.users.update({
            where: {
                email: email
            },
            data:{
                password: email
            }
        });
        res.json({ message: "password reset successful" });
    }
    catch (error) {
        res.json(error);
    }
})



const oAuth2Client=new google.auth.OAuth2({
    clientId:process.env.client_id! ,
   clientSecret: process.env.client_secret!,
   redirectUri: process.env.redirect_uri! 
})

console.log(process.env.redirect_uri! )
const state = crypto.randomBytes(32).toString("hex");
app.get('/auth/google',async(req,res)=>{
    console.log("google acesss" )
    const authUrl=oAuth2Client.generateAuthUrl({
        response_type: 'token',
        access_type:'online',
        scope:['https://www.googleapis.com/auth/youtube.upload','https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'],
        include_granted_scopes: true,
        state:state
    })
    console.log("google acesss",authUrl)
    res.redirect(authUrl)
})
app.get("/auth/google/callback", async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();
    const userEmail = data.email?.toString() || "";

    await prisma.token.upsert({
      where: { userEmail },
      update: {
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
      },
      create: {
        userEmail,
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
      },
    });
  } catch (error) {
    console.log(error, "not found code");
  }
  res.redirect("http://localhost:8080/Videos");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
