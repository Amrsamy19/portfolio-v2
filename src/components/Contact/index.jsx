/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Facebook, GitHub, LinkedIn, Person } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import CV from "../../assets/Amr-Samy-Resume.pdf";
import Link from "@mui/material/Link";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useTranslation } from "react-i18next";

export const Contact = ({ darkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailState, setEmailState] = useState(true);
  const { t, i18n } = useTranslation();

  const CustomInputStyle = {
    "& .MuiInput-root": {
      color: darkMode ? "#fff" : darkMode ? "#fff" : "#3c0753",
      "&:before": {
        borderColor: darkMode ? "#fff" : "#3c0753",
      },
      "&:after": {
        borderColor: darkMode ? "#db6db8" : "#3c0753",
      },
      ":hover:not(.Mui-focused)": {
        "&:before": {
          borderColor: darkMode ? "#db6db8" : "#3c0753",
        },
      },
    },
    // Label
    "& .MuiInputLabel-standard": {
      fontFamily: `${i18n.language === "ar" ? "Amiri" : "Poppins"}`,
      fontWeight: "600",
      color: darkMode ? "#fff" : "#3c0753",
      "&.Mui-focused": {
        color: darkMode ? "#db6db8" : "#3c0753",
      },
    },
  };

  const ColorButton = styled(Button)(() => ({
    color: darkMode ? "#fff" : darkMode ? "#fff" : "#3c0753",
    borderColor: darkMode ? "#fff" : darkMode ? "#fff" : "#3c0753",
    border: "2px solid",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "0.2s",
    "&:hover": {
      borderColor: "#db6db8",
      color: "#db6db8",
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_dc3qb0e",
        "template_2rjkrtk",
        { name: name, email: email, message: message },
        {
          publicKey: "xT88mQTbxxAd0kpNe",
        }
      )
      .then(() => {
        setEmailState(!emailState);
      });
  };

  return (
    <section id="contact" className="contact__section">
      <h2>{t("contact.title")}</h2>
      <div className="contact__grid">
        <div className="social__section">
          <div>
            <Link
              href="https://github.com/Amrsamy19"
              target="_blank"
              rel="noopener"
            >
              <ColorButton variant="outlined" startIcon={<GitHub />}>
                Github
              </ColorButton>
            </Link>
            <Link
              href="https://www.linkedin.com/in/amrsamyramadan/"
              target="_blank"
              rel="noopener"
            >
              <ColorButton variant="outlined" startIcon={<LinkedIn />}>
                Linkedin
              </ColorButton>
            </Link>
          </div>
          <div>
            <Link
              href="https://web.facebook.com/iambigbanana69"
              target="_blank"
              rel="noopener"
            >
              <ColorButton variant="outlined" startIcon={<Facebook />}>
                Facebook
              </ColorButton>
            </Link>
            <Link href={CV} target="_blank" rel="noopener">
              <ColorButton variant="outlined" startIcon={<Person />}>
                Download CV
              </ColorButton>
            </Link>
          </div>
        </div>
        <form
          className="contact__form"
          onSubmit={(e) => {
            handleSubmit(e);
            emailState
              ? toast.success("Message arrived successfully.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
              : "";
          }}
        >
          <TextField
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label={t("contact.name")}
            type="text"
            variant="standard"
            sx={CustomInputStyle}
            fullWidth
            required
          />
          <TextField
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            label={t("contact.email")}
            type="email"
            variant="standard"
            fullWidth
            sx={CustomInputStyle}
            required
          />
          <TextField
            id="message"
            label={t("contact.message")}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            variant="standard"
            sx={CustomInputStyle}
            fullWidth
            multiline
            maxRows={5}
            required
          />
          <ColorButton type="submit" variant="outlined">
            {t("contact.send")}
          </ColorButton>
        </form>
      </div>
    </section>
  );
};
