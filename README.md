# SI Select

A responsive, static marketplace page for eight owner-held `.si` domains. It includes instant search, category filters, domain-specific enquiries, and a simple transfer explanation.

## Local preview

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Configure enquiries

Set `contact.email` and/or `contact.whatsapp` at the top of `script.js` before publishing. Without either value, the page transparently says that the sales contact is pending; it does not claim to send an enquiry.

`contact.whatsapp` should be an international number with digits only, without `+` or spaces.

## Deployment

This is plain HTML, CSS, and JavaScript. Import the repository in Vercel with Framework Preset **Other** and no build command. The root directory is the repository root.
