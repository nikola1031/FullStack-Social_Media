import { Application } from "express";
import express from 'express';
import cors from 'cors';

export function initExpress(app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors({origin: '*'}));
}