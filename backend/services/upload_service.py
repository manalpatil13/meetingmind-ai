import os
import uuid


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


def save_uploaded_file(file):

    extension = (
        file.filename.split(".")[-1]
    )

    filename = (
        f"{uuid.uuid4()}.{extension}"
    )

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    with open(
        filepath,
        "wb"
    ) as buffer:

        buffer.write(
            file.file.read()
        )

    return filepath, filename