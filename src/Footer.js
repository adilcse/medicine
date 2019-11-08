import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
const FooterPage = () => {
  return (
    <MDBFooter color="success-color" className="pt-6 mt-6">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Revive</h5>
            <p>
             This App id designed to delever medicines as quick as possible.
             so please support us.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Social media</h5>
            <ul>
            <li className="list-unstyled">
                <a href="#!">Facebook </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Tweeter </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Whatsapp </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Instagram </a>
              </li>
              
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.revive.web.app"> ReVive.web.app </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;