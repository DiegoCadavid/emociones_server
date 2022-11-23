const express = require('express');
const Letter = require('../database/models/Letter');
const { sendMessage } = require('../discord/connectDiscord');
const letterRouter = express.Router();

letterRouter.post('/', async(req, res) => {
    try {
        const { title, content } = req.body;
        if(!(title || content)) {
            return res.status(400).json({
                msg : "faltan valores, valores nesesarios ( title, content)"
            })
        }

        const letter = new Letter({
            title, 
            content,
            createAt: new Date()
        });

        await letter.save();

        sendMessage(`Nueva carga subida (${title})`)
        res.status(200).json(letter);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "SERVER ERROR"
        })
    }
});

// get alls letter
letterRouter.get('/', async(req, res) => {
    try {
        const letter = await Letter.find();
        res.status(200).json(letter);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : "SERVER ERROR"
        })
    }
})

// remove letter by id 
letterRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const letter = await Letter.findOneAndRemove({ _id: id }, { new: true });

    if (!letter) {
      return res.status(400).json({
        msg: "no existe una letter con ese id",
      });
    }

    sendMessage(`Carta (${letter.title}) removida`);
    return res.status(200).json(letter);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "SERVER ERROR",
    });
  }
});
module.exports = letterRouter;