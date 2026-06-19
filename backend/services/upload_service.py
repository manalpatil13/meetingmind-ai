import os
from uuid import uuid4


UPLOAD_DIR = "uploads"


def save_uploaded_file(file):

    extension = file.filename.split(".")[-1]

    unique_name = f"{uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        unique_name
    )

    with open(filepath, "wb") as buffer:
        buffer.write(file.file.read())

    return filepath, unique_name