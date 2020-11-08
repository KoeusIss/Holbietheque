import React from "react";
import {render} from "@testing-library/react";
import Signup from "./index";

describe ("Signup", () => {
  test("Should render Signup component", () => {
    render(<Signup/>)
  })
})