import React, { useState } from "react";
import { Container, Alert, Button, Row } from "react-bootstrap";

import { useVolumeContext } from "../../context/volume-context";

export default function InfoText(props) {
  const {
    state: { selection },
    dispatch,
  } = useVolumeContext();

  return (
    <Container className="my-2">
      <Alert
        variant="primary"
        className="d-flex flex-column justify-content-center"
      >
        <p>
          The 3D volume of the Narragansett Bay and Rhode Island Sound below
          shows the{" "}
          <a
            href="https://riddc-jupyter-book.web.app/notebooks/fox-kemper/osom_intro.html#"
            target="_blank"
          >
            Ocean State Oceanographic Model
          </a>{" "}
          predictions for {selection.measurement.name} on{" "}
          {selection.season.date} at {selection.tide.name}.
        </p>
        <p>
          {" "}
          Explore the bay by selecting different measurements, seasons and
          tides, or select the options button to adjust the color and view.{" "}
        </p>

        <Button
          variant="primary"
          size="sm"
          href="#information"
          className=" align-self-center"
        >
          Learn More Below
        </Button>
      </Alert>
    </Container>
  );
}
