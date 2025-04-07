import React from "react";
import appStore from "../assets/img/app-store.webp";
import playStore from "../assets/img/play-store.webp";

function GetAppSection() {
  return (
    <section className="uui-section_heroheader07-2">
      <div className="uui-page-padding-28">
        <div className="uui-container-large-23">
          <div className="uui-padding-vertical-xhuge-24 download-section pt-0">
            <div className="w-layout-grid uui-heroheader07_component-2">
              <div className="uui-heroheader07_image-wrapper-2"></div>
              <div className="uui-heroheader07_content-2 z-index-1 heroheader_change_order">
                <h1 className="download_heading">
                  Checkout our Teledental App(s)
                </h1>

                <div className="uui-max-width-small-4">
                  <div className="uui-text-size-xlarge-17 text-color-gray200">
                    Want a Dentist Second Opinion?
                  </div>
                </div>
                <div className="uui-max-width-small-4">
                  <div className="uui-text-size-xlarge-17 text-color-gray200">
                    Have a Dental Question? Get Live Dentists Answers Online
                    24/7
                  </div>
                </div>
                <div className="uui-space-large-11"></div>
                <div className="uui-button-row-17 is-reverse-mobile-landscape">
                  <div className="uui-button-wrapper-14 max-width-full-mobile-landscape">
                    <a
                      href="https://apps.apple.com/us/app/teledental/id1505549561"
                      target="_blank"
                      className="uui-button-26 is-button-large w-inline-block"
                    >
                      <img src={appStore} loading="lazy" alt="app store icon" />
                    </a>
                  </div>
                  <div className="uui-button-wrapper-14 max-width-full-mobile-landscape">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.app.teledental_mobile&hl=en_US"
                      target="_blank"
                      className="uui-button-26 is-button-large w-inline-block"
                    >
                      <img
                        src={playStore}
                        loading="lazy"
                        alt="play store icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetAppSection;
