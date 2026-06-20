import { useState } from "react";

import api from "../services/api";
import ResolveAnimation from "./ResolveAnimation";

function UploadModal({
    open,
    onClose,
    onSuccess
}) {
    const [uploading, setUploading] =
        useState(false);

    const [stage, setStage] =
        useState(0);

    async function handleFile(event) {

        const file =
            event.target.files[0];

        if (!file) return;

        setUploading(true);

        const formData =
            new FormData();

        formData.append(
            "audio",
            file
        );

        try {

            setStage(1);

            await new Promise(
                r => setTimeout(r, 1000)
            );

            setStage(2);

            await new Promise(
                r => setTimeout(r, 1000)
            );

            setStage(3);

            await api.post(
                "/upload",
                formData
            );

            setStage(4);

            onSuccess();

        } catch (error) {

            console.error(error);

        } finally {

            setTimeout(() => {

                setUploading(false);

                setStage(0);

                onClose();

            }, 1200);
        }
    }

    if (!open) return null;

    return (
        <div className="modal-overlay">

            <div className="upload-modal">

                <h2 className="upload-title">
                    Upload Recording
                </h2>

                {!uploading ? (

                    <label className="dropzone">

                        <input
                            type="file"
                            accept=".mp3,.wav,.m4a"
                            onChange={handleFile}
                            style={{ display: "none" }}
                        />

                        <div className="upload-icon">
                            ⟲
                        </div>

                        <h3>
                            Click to upload audio
                        </h3>

                        <p>
                            Drag your meeting recording into the intelligence pipeline.
                        </p>

                        <span>
                            WAV · MP3 · M4A
                        </span>

                    </label>

                ) : (

                    <>

                        <ResolveAnimation
                            stage={stage}
                        />

                        <div className="upload-status">

                            {stage === 1 &&
                                "Transcribing audio..."}

                            {stage === 2 &&
                                "Extracting insights..."}

                            {stage === 3 &&
                                "Structuring intelligence..."}

                            {stage === 4 &&
                                "Completed"}

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default UploadModal;