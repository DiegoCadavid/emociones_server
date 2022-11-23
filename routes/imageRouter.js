const express = require("express");
const { findOneAndDelete } = require("../database/models/Image");
const Image = require("../database/models/Image");
const cloudinary = require("cloudinary").v2;

const imageRouter = express.Router();

imageRouter.post("/upload", async (req, res) => {
  try {
    const files = req.files;

    if (!files) {
      return res.status(400).json({
        msg: "Debe enviar una imagen",
      });
    }

    const image = files?.image;

    if (!image) {
      return res.status(400).json({
        msg: "Debe enviar la imagen con la key image en el form-data",
      });
    }

    if (image.length) {
      return res.status(400).json({
        msg: "solo puede enviar una imagen",
      });
    }

    const { public_id, secure_url } = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "emociones" }, (err, res) => {
          if (err) {
            return reject(err);
          }

          resolve(res);
        })
        .end(image.data);
    });

    res.status(200).json({ public_id, url: secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "SERVER ERROR",
    });
  }
});

imageRouter.post("/", async (req, res) => {
  try {
    // Validate body keys
    const { url = null, cloudinaryId = null, label = null } = req.body;

    // Validamos que el usuario envio todos los valores
    if (!(url || cloudinaryId || label)) {
      return res.status(400).json({
        msg: "faltan valores, valores nesesarios ( url, cloudinaryId, label)",
      });
    }

    // valoramos que cloudinary id existe
    try {
      await cloudinary.api.resource(cloudinaryId);
    } catch (error) {
      if (error?.error.http_code === 404) {
        return res.status(400).json({
          msg: "no existe una imagen con ese cloudinary id",
        });
      } else {
        return res.status(500).json({
          msg: "SERVER ERROR",
        });
      }
    }

    // Creamos el documento a base del moduelo
    const image = Image({
      url,
      cloudinaryId,
      label,
      createAt : new Date()
    });

    await image.save();

    // Enviamos una respuesta
    res.status(200).json(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "SERVER ERROR",
    });
  }
});

// get all images
imageRouter.get('/', async(req, res) => {
  try {
      const images = await Image.find();
      res.status(200).json(images)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "SERVER ERROR",
    });
  }
})

// Remove image
imageRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findOneAndRemove({ _id: id }, { new: true });

    if (!image) {
      return res.status(400).json({
        msg: "no existe una imagen con ese id",
      });
    }

    return res.status(200).json(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "SERVER ERROR",
    });
  }
});
module.exports = imageRouter;
