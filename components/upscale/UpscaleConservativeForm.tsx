"use client"

import { upscaleConservative } from "../../ts/client/upscale"
import UpscaleForm from "./UpscaleForm"

const UpscaleConservativeForm = () => <UpscaleForm onSend={upscaleConservative} />;

export default UpscaleConservativeForm;