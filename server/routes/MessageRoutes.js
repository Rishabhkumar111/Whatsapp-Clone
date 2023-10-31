import { Router } from "express";
import { addAudioMesage, addImageMesage, addMessage, getInitialContactSwitchMessages, getMessage } from "../controllers/MessageController.js";
import multer from "multer";
 
const router = Router();

const upload = multer({dest:"uploads/recordings"});
const uploadImage = multer({dest:"uploads/images"});

router.post("/add-message",addMessage);
router.get("/get-messages/:from/:to",getMessage);
router.post("/add-image-message",uploadImage.single("image"), addImageMesage);
router.post("/add-audio-message",upload.single("audio"), addAudioMesage);
router.get("/get/initial/contacts/:from",getInitialContactSwitchMessages)

export default router;