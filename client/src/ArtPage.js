import React, { Component } from 'react';

class ArtPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <section className="hero text-center bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <img className="img-fluid mb-3" src={'https://photos-4.dropbox.com/t/2/AABwPAcQUWbochoMe3-qfxsG7GBnBbbOQ1Hf25Vt3nNNCQ/12/102326941/jpeg/32x32/1/_/1/2/Julia%20Cai%20-%20IMG_1809.jpg/EInuoU8Y1PAQIAcoBw/TpvMZmj-d04gbL8xFePglRuRtNNGv1rHCzn0_OOIrJs?size=32x32&size_mode=5'} alt=""/>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={process.env.PUBLIC_URL + '/fatima.jpg'} alt=""/>
                  <h5>Fatima Kahbi</h5>
                  <p className="font-weight-light mb-0">Yale 19. Computer Science.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                <ul className="list-inline mb-2">
                  <li className="list-inline-item">
                    <a href="mailto:tevin@mickens.yale.edu" target="_blank">Talk to Us!</a>
                  </li>
                </ul>
                <p className="mb-4 mb-lg-0">&copy; Exhibit 2018. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

      </div>
    );
  }
}

export default ArtPage;
