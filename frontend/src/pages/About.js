import emailjs from 'emailjs-com';
import React from 'react';
import { AiFillMail, AiTwotonePhone } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import Page from '../components/Page';

const About = () => {

    function sendEmail(e) {
        console.log(e)
        e.preventDefault();

        emailjs.sendForm('service_2wbaa6c', 'template_560eu1g', e.target, 'user_uLXs86bSC4m0hhz5vjNiY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <Page >
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 40
                }}>
                <div style={{
                    marginTop: 20,
                    fontSize: 20
                }}>
                    <h1> <b>Dane kontaktowe:</b> </h1>
                </div>
                <iframe
                    title='sportApp'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d453295.45006025356!2d16.46445240914553!3d51.124561005506074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9c2d4b58abf%3A0xb70956aec205e0f5!2zV3JvY8WCYXc!5e0!3m2!1spl!2spl!4v1623256417634!5m2!1spl!2spl"
                    style={{
                        width: '100%',
                        height: 400,
                        marginTop: 20
                    }}>
                </iframe>
                <div style={{
                    marginTop: 50,
                }}>
                    <div style={{
                        width: '50%',
                        float: 'left'
                    }}>
                        <h1> <b>SportApp</b> </h1>
                        <h2><IoLocationSharp /> Kłodzka 1, Wrocław </h2>
                        <h2><AiTwotonePhone /> 781 202 104 </h2>
                        <h2><AiFillMail /> sport@app.pl </h2>
                    </div>
                    <div style={{
                        width: '50%',
                        float: 'left'
                    }}>
                        <h2><b>Godziny otwarcia</b></h2>
                        <h2>Poniedziałek - Piątek : 10:00 - 20:00</h2>
                        <h2>Sobota : 10:00 - 18:00</h2>
                        <h2> Niedziela : 12:00 - 18:00</h2>
                    </div>
                </div>
                <div style={{
                    marginTop: 300 
                }}>
                    <h1><b> Skontaktuj się z nami:</b> </h1>
                    <div>
                        <form className="contact-form" onSubmit={sendEmail} style={{fontSize: 18}}>
                            <input style={{
                                width: '100%',
                                height: 50,
                                margin: '10px 0',
                                padding: 10
                                
                            }} type="text" name="subject" placeholder='Tytuł' />
                            <input style={{
                                width: '100%',
                                height: 50,
                                margin: '10px 0',
                                padding: 10

                            }} type="email" name="email" placeholder='Email' />
                            <input style={{
                                width: '100%',
                                height: 120,
                                margin: '10px 0',
                                padding: 10

                            }} name="message" placeholder='Treść' />
                            <button style={{ width: '100%', height: 60 }} value="Send">
                                <b>Wyślij wiadomość</b>
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default About;
