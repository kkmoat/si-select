# SI Select

A responsive, compact marketplace page for eight owner-held `.si` domains. The complete collection and enquiry entry point fit together on one desktop screen; each domain opens a specific enquiry dialog.

## Local preview

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Configure enquiries

The sales email is set to `gvinteir@gmail.com` in `script.js`, and is also shown in the contact section. Change both places together if the sales address changes. Optionally add `contact.whatsapp` at the top of `script.js`.

`contact.whatsapp` should be an international number with digits only, without `+` or spaces.

## Deployment

This is plain HTML, CSS, and JavaScript. Import the repository in Vercel with Framework Preset **Other** and no build command. The root directory is the repository root.
