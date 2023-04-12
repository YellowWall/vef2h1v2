import express, {Request, Response} from 'express';
import {
  createEvent,
  deleteEvent,
  getEvent,
  listEvents,
  updateEvent,
} from '../lib/Events.js';

import { getRegistrations } from '../lib/db.js';

import {postRegistration, deleteRegistration, getEventRegistrations, patchRegistration } from '../lib/Registrations.js';
import { createUser, findByUsername } from '../lib/Users.js';
import passport, { authMiddleware, isUser, signOut } from '../lib/login.js';
import { addImage, getImages } from '../lib/imgapi.js';



export const router = express.Router();

export async function index(req:Request, res: Response) {
    return res.json([
      {
        href: '/event',
        methods: ['GET', 'POST'],
      },
      {
        href: '/event/:slug',
        methods: ['GET', 'PATCH', 'DELETE'],
      },
      {
        href: '/event/:slug/events',
        methods: ['GET', 'POST'],
      },
      {
        href: '/event/:slug/events/:user',
        methods: ['GET', 'PATCH', 'DELETE'],
        response:['200 OK','400 Bad Request','401 Unauthorized','404 not found','500 server side error']
      },
      {
        href: '/login',
        methods: ['POST'],
        response: ["200 OK", "400 Bad request", "401 Unauthorized"],
      },
      {
        href: '/logout',
        methods: ['POST'],
        response: ["200 OK"]
      },
      {
        href: '/signup',
        methods: ['POST'],
      }
    ]);
}


router.get('/', index) // virkar 
router.get('/event', listEvents); // virkar 
router.post('/event', createEvent); // virkar
router.get('/event/:slug', getEvent); // virkar
router.patch('/event/:slug', updateEvent); // virkar
router.delete('/event/:slug', deleteEvent); // virkar en ekki sem er með id 1 

//router.get('/event/:slug/img/:image',getImage)
router.get('/event/:slug/img',getImages)
router.post('/event/:slug/img',addImage)
//router.delete('/event/:slug/img/:image',delImage)

router.get('/event/:slug/regis',getEventRegistrations);
router.patch('/event/:slug/regis/:username',patchRegistration);
router.delete('/event/:slug/regis/:username',deleteRegistration);
router.post('/event/:slug',postRegistration);
//router.get('/event/:events/:user', registerDetails)
//router.patch('/event/:eventss/:user',updateRegistration)

router.post('/login', passport.authenticate("local", {session: false}), authMiddleware);
router.post('/signup', createUser);
router.post('/logout',signOut);

//router.post('/login',loginCheck)
//router.get('/logout',endSession)

