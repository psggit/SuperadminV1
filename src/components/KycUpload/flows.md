Already have a file and the user uploads a file
  Disable the previous file (status = inactive)
Flow:
  User comes to the upload KYC Page
    1. If the photos were already uploaded
      Assumption: If the photos were uploaded already then the status would also have changed
      i)  If the admin wants to change the verification status to No/Yes again will he be allowed to change?
    2. If the photos were not uploaded yet
      i) User selects the type of proof from the select box and uploads the photo in the corresponding section
      Logic:
        Check the new files being uploaded by the user, if there are any?
          Use that to create an entry in the kyc_files table
    Always create a new customer kyc entry (Which is used for history)
