import React from 'react';
import { appSettings } from '../../../Config';
import './Navbar.scss';

function Navbar() {
    return (
        <section className="col-lg8">
            <nav className="consent-navigation">
                <div>
                    <a href={appSettings.VigoBasAboutMe}> Om meg</a>
                </div>
            </nav>
        </section>
    )
}
export default Navbar;