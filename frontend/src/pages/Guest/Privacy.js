import React, { useEffect } from "react";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="privacy">
        <h3>Privacy & Policy</h3>
        <h2>
          <div>Website Privacy Protection</div>
          <div>Statement</div>
        </h2>
        <p>
          We stress the importance of privacy and are committed to earning your
          trust by adopting high standards for the protection of your personal
          information.
        </p>
        <p>
          This policy applies to our website and outlines the type of personal
          information we collect and receive, the circumstances in which we
          collect or receive personal information, the policies and procedures
          we have established outlining its use and storage, and for sharing
          certain types of personal information in certain limited
          circumstances, the procedures you should follow if you have any
          questions or requests in respect of your personal information or our
          policies and procedures and the person to whom such questions or
          requests should be directed, and the means by which to communicate
          with that person.
        </p>
        <p>
          In this policy, ‘personal information’ or ‘personally identifiable
          information’ means information about you that is unique and would
          actually or potentially identify you as an individual, like your name,
          address, e-mail address or phone number, and that is not otherwise
          publicly available and is not part of your work identification and
          includes information you provide to us when you use our website to
          make or modify a reservation, establish a profile, communicate
          personal preferences, participate in, respond to or take advantage of
          special offers, or which you otherwise provide to us in the course of
          using of our website. Aggregate information or statistics, even if
          compiled or derived from your personal information and then aggregated
          and mingled with information of others, is not personal information
          since it does not identify you or any specific personally identifiable
          information about you. We use aggregate or statistical information to
          better serve our guests and customers generally, to enhance the
          performance of our website and to generally improve how we do
          business.
        </p>

        {/* --------------------- HOW? -------------------- */}
        <h4>
          How you may provide us your personal information using our website
        </h4>
        <ul>
          <li>By making a reservation or by using the website.</li>
          <li>
            By registering or otherwise entering information on or through our
            website.
          </li>
        </ul>

        {/* --------- MAKING RESERVATION ------------ */}
        <h4>Making a reservation/completing forms</h4>
        <p>
          When making a reservation or using forms on the website it is
          necessary to have information in order to identify you, contact you
          and to process your requests. This usually includes your name,
          address, phone number, e-mail address, expiration date. It may also
          include, if you choose to share that information with us, your
          preferences regarding services we may offer, such as type of room,
          type of bed, and the like. From time to time, we also offer special
          discounts offers (for example, to seniors or for children) and we may
          require other qualifying information to assess your eligibility and
          process your reservation or participation correctly.
        </p>

        {/* ----------------- BY VISITING ------------- */}
        <h4>By visiting our website</h4>
        <p>
          Our website does not collect personally identifiable information from
          you or your computer when you simply visit (e.g., browse) and unless
          you actually provide us with personally identifiable information, we
          will not know or collect your name, your e-mail address or any other
          personally identifiable information about you. When you a request or
          visit a page on our website, we do log certain communications,
          technical and operational information and aggregate it with other
          similar information in order to make our website function correctly,
          do capacity and other technical planning and generally make our
          website function properly and improve it where we can. We also use
          this information to better understand how visitors use our website and
          how we can better tailor our website, its contents and functionality
          to meet your needs.
        </p>

        {/* ------------------ WHY ----------- */}
        <h4>Why we collect personal information</h4>
        <ul>
          <li>
            To establish, maintain and honor our relationship with you and to
            provide you with our services and those of our third party suppliers
            and promotional partners.
          </li>
          <li>
            To understand and better attempt to fulfill your needs and
            preferences in providing services from us.
          </li>
          <li>
            To manage and develop our business and operations and help us
            improve our services for you
          </li>
          <li>To meet legal and regulatory requirements.</li>
        </ul>

        {/* -------- PRINCIPLES -------------- */}
        <h4>Principles</h4>
        <ul>
          <li>
            We will not collect, use or disclose your personal information for
            any other purpose than those identified above, except with your
            consent.
          </li>
          <li>
            We will safeguard your personal information from disclosure other
            than as identified above or with your consent.
          </li>
          <li>
            We will take steps to protect the confidentiality of your personal
            information when dealing with third parties, consistent with our
            policy and the laws and regulations that apply.
          </li>
          <li>
            We will strive to keep your personal information accurate and up to
            date and we will provide you with reasonable opportunities to
            access, correct and update your personal information.
          </li>
        </ul>
        <p>
          You are always free to refuse to provide personal information to us,
          recognizing that in some cases this may limit or make it impossible
          for us to agree to provide you with the services or goods you may
          request.
        </p>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Privacy;
