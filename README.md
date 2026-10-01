# SI Select

A responsive, compact marketplace page for eight owner-held `.si` domains. The complete collection and enquiry entry point fit together on one desktop screen; each domain opens a specific enquiry dialog.

## Local preview

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000`.

## Configure enquiries

The sales email is set to `k2moat@gmail.com` in `script.js` and the fallback link in `index.html`; change both together if needed. The page has an English/Chinese switch, remembers the chosen language when storage is available, and translates the enquiry email text. Optionally add `contact.whatsapp` at the top of `script.js`.

USDT is shown as an accepted payment method after a price is agreed. The site does not collect payment or display a wallet address; the owner shares the supported network and receiving details with the buyer after the enquiry.

`contact.whatsapp` should be an international number with digits only, without `+` or spaces.

## Deployment

This is plain HTML, CSS, and JavaScript. Import the repository in Vercel with Framework Preset **Other** and no build command. The root directory is the repository root.
