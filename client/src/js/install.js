const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt display
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the "Install" button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if the deferredPrompt is available
  if (deferredPrompt) {
    // Show the PWA installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    // Check the user's choice (accepted or dismissed)
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation prompt.');
    } else {
      console.log('User dismissed the PWA installation prompt.');
    }
    // Clear the deferredPrompt since it can only be used once
    deferredPrompt = null;
    // Hide the "Install" button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App successfully installed as a PWA.');
});
