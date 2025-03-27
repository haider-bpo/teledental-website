import React from "react";
import Header from "../Commons/Header";
import worksImage from "../assets/img/991.png";


const HowItWork = () => {

  return (
    <><Header />
        <section class="how__it__works__area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="how__titfa-pull-left">
                        <h2 class="text-center">HOW IT WORKS</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="hiwa__left">
                        <h2>How to get started on Teledental.com</h2>
                        <ul class="hiwa__left__list">
                            <li><a href="https://teledental.com/patient-signup" target="_blank">Go to the patient sign-up page.</a></li>
                            <li>Fill out a shorter form to get started. </li>
                            <li> Once confirmed email and sign-in, please update your patient profile information. </li>
                            <li>Request appointment time. </li>
                            <li>Payment </li>
                        </ul>
                        
                        <p class="para___txt">Welcome to Teledental. Visit us at Teledental.com or Teledental app on IOS and Android.</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="hiwa__right">
                        <img src={worksImage} alt="Best Teledentistry Online Virtual Dentistry with Live Dentists at Teledental" class="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="how__text__fluid">
        <div class="container">
            
            <div class="row">
                <div class="col-md-12">
                    <div class="how__fluid__content">
                        <h2>Teledental is the next generation of virtual dental care services that connects live dentists to patients.</h2>
                        <br />
                        <br />
                        <p>Teledental Consultation by appointment - From anywhere, at your convenience.</p>
                        <p>Get started by going to <a href=" https://teledental.com/patient-signup"> https://teledental.com/patient-signup</a></p>
                        <p>FAQ Teledental Information visit <a href="https://teledental.com/faqs-question">https://teledental.com/faqs-question</a></p>
                        <p>Do you have a Virtual Cosmetic Dental Care Question, Live Toothache Pain Inquiry, Need More Virtual Dental Implant Information Online -can ask us your local dentistry questions at Teledental.</p>
                        <p>Local Dental Question Discussion, Live Dentists and Virtual Dentistry Consulting - Teledental is here for you!</p>
                        <p>Virtual Dental Care Messaging with a Live Dentist - Teledental is helping people get better dental insight into their dental inquiries. Many people are seeking online dental care information for their dental concerns.</p>
                        <p>Your oral health is our priority!</p>
                        <p>Live Tele Dental Consult | Virtual Dentists | Live Dentist Consultation | Teledentist Dental Help Information | Best Teledentistry Consulting <a href="https://teledental.com/patient-signup">https://teledental.com/patient-signup</a></p>
                        <br />
                        <br />
                        <h2>Teledental Dental Care Consulting - Live Virtual Dentistry Consult 24/7</h2>
                        <br />
                        <p>Would you love a live virtual dentistry consultation instead? Don't worry; we've got you covered! We understand that you may be busy with work or other activities, which is why we offer live video dental consultations and services with qualified dentists. Chat virtually with dentists 24/7, from anywhere!</p>
                        <h2>Live Dentists Consult, Teledentistry Video Dental Care, AI Tele Dentistry Information and Get Dentist Suggestions Anytime with Tele Dental Service Suggestions - AI Teledental Services and more at Teledental.com</h2>
                        <p>Telehealth services have rapidly grown over the past several years. The best is yet to come. We are at Teledental.com looking to expand and grow. We understand that you as a patient will ultimately have to go to your local dentist's office for dental treatment. We can provide perhaps useful live video dental care information for people seeking greater dentistry understanding online. Many people have Local Dental Questions or Dental Treatment Inquiries. 24/7 Virtual Dental Care Information with Live Dentist Consulting Online via Online Dentistry Video with us at Teledental. We are looking to scale and add more features. Our goal is to better connect dentists with dental patients. We are continuously looking to add more dental information and tele dental AI chatting features. </p>

                        <p>Our growth in the next couple of years, we hope will be immense with newer technologies and expanded services. We do recommend all people get local dental office treatment for any dental care problems - which may require dental x-rays, a thorough in-office dental exam, and a good dental treatment plan after having reviewed fully all your dental information. Hence, Teledental services or Teledentistry information is not meant to replace in-office dental care. It can provide perhaps a good online dental resource for greater dental information. Each person does need to do their own due diligence. </p>
                    </div>
                </div>
            </div>
        </div>
    </section></>
  );
};

export default HowItWork;
