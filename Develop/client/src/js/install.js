const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // To store the event for later use

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default browser install prompt
  deferredPrompt = event; // Store the event for later use
  // Update the UI to indicate the install option is available
  butInstall.style.display = 'block';
});

// Click event handler for installing the PWA
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the install prompt
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }
    deferredPrompt = null; // Reset the deferredPrompt after user choice
    // Update the UI to hide the install option
    butInstall.style.display = 'none';
  }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});
