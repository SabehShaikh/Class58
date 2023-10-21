import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: "sabehshaikh201@gmail.com",
        pass: "gogglesabehshaikh7865",
    },
});

export default transporter;