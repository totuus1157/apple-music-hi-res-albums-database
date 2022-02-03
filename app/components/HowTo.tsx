import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export default function HowTo(props: {
  setShow: (arg0: boolean) => any;
  show: boolean;
}): JSX.Element {
  const handleClose = (): void => props.setShow(false);

  return (
    <>
      {" "}
      <style jsx>
        {`
          p {
            color: red;
          }
        `}
      </style>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <p>You will need to log in with your Apple ID in advance.</p>
            <li>
              Display the desired album from the Music app, and select &quot;Get
              Info&quot; from the &quot;...&quot; icon to the right of the
              title.
            </li>
            <li>
              Copy &quot;artist&quot;, &quot;album&quot;, and
              &quot;composer&quot; (if the genre is &quot;Classical&quot;) from
              the items in the opened window and paste them into the
              &quot;Artist&quot;, &quot;Title&quot;, and &quot;Composer&quot;
              text boxes of our app, respectively. At the same time, select
              &quot;Genre&quot; (if &quot;Classical&quot; is not selected, the
              &quot;Composer&quot; text box will not be activated).
            </li>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    About entering non-Latin names
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Card.Text>
                      Only the Latin alphabet can be used for this service. If
                      the name of the artist, album, or composer you wish to
                      register is not in Latin, please convert it to the Latin
                      alphabet specified by the country or region to which you
                      belong before entering it (basically, please follow the
                      notation rules specified by the International Organization
                      for Standardization).
                    </Card.Text>
                    <Card.Text>Major ISO Romanization Standards:</Card.Text>
                    <ul>
                      <li>
                        <a
                          href="https://ru.wikipedia.org/wiki/ISO_9"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 9 - Cyrillic
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://ar.wikipedia.org/wiki/%D8%A3%D9%8A%D8%B2%D9%88_233"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 233 - Arabic
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://he.wikipedia.org/wiki/ISO_259"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 259 - Hebrew
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://el.wikipedia.org/wiki/ISO_843"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 843 - Greek
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://ja.wikipedia.org/wiki/ISO_3602"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 3602 - Japanese
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://zh.wikipedia.org/wiki/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 7098 - Chinese
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://ka.wikipedia.org/wiki/ISO_9984"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 9984 - Georgian
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://hy.wikipedia.org/wiki/%D5%80%D5%A1%D5%B5%D5%A5%D6%80%D5%A5%D5%B6_%D5%A1%D5%B5%D5%A2%D5%B8%D6%82%D5%A2%D5%A5%D5%B6%D5%AB_%D5%BC%D5%B8%D5%B4%D5%A1%D5%B6%D5%A1%D5%AF%D5%A1%D5%B6%D5%A1%D6%81%D5%B8%D6%82%D5%B4"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 9985 - Armenian
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://th.wikipedia.org/wiki/ISO_11940"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 11940 - Thai
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://hi.wikipedia.org/wiki/%E0%A4%86%E0%A4%88%E0%A4%8F%E0%A4%B8%E0%A4%93_%E0%A5%A7%E0%A5%AB%E0%A5%AF%E0%A5%A7%E0%A5%AF"
                          rel="external nofollow noopener noreferrer"
                          target="_blank"
                        >
                          ISO 15919 - Devanagari and related Indic scripts
                        </a>
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <li>
              Play the album and click on the wavy icon on the right side of the
              window where the song title is displayed, the sampling rate will
              be displayed and you can select it from the radio buttons in our
              app.
            </li>
            <li>
              Finally, click the &quot;...&quot; icon next to the album name
              again. icon again, do &quot;Share&quot; -{">"} &quot;Copy
              Link&quot;, and paste the address you got into the &quot;URL&quot;
              text box of our app.
            </li>
            <li>
              Click on the &quot;Save changes&quot; button and make sure that
              the registered album appears correctly in the database.
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
