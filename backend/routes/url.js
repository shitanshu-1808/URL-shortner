import express from "express";
import Url from "../models/Url.js";
import {nanoid} from 'nanoid';

const router = express.Router();

router.post("/shorten",async(req,res)=>{
    try{
        const {originalUrl} = req.body;

        if(!originalUrl){
            return res.status(400).json({error:"Original URL is required"})
        }

        try {
            new URL(originalUrl);
        } catch (error) {
            return res.status(400).json({error : "Invalid URL"});
        }

        let shortId;
        let exists = true;

        while(exists){
            shortId = nanoid(7);
            exists = await URL.findOne({shortId});
        }

        const url = URL.createObjectURL({
            shortId,originalUrl
        });
        res.json(200).json({
            shortId : url.shortId,
            shortUrl: `${process.env.BASE_URL}/${URL.shortId}`,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Server error"});
    }
})

router.get("/:shortId",async(req,res)=>{
    try {
        const {shortId} = req.params;

        const url = await Url.findOne({shortId});
        if(!url) return res.status(404).json({error:"URL not found"});
        url.clicks ++;
        await url.save();

        return res.redirect(url.originalUrl);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
});

export default router;