import React from 'react';
import { appSettings } from '../../../Config';
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <section className="row">
                <hr className="footer-bottom__seperator" />
                <section className="footer-info">
                    <p>
                        <strong>{appSettings.OrgName}</strong>
                    </p>
                    <p>
                        <a href="mailto:@appSettings.RequestSenderEmail">{appSettings.RequestSenderEmail}</a> | tlf. {appSettings.RequestSenderTel}
                    </p>
                </section>

            </section>
        </footer>
    )
}
export default Footer;