
window.electronAPI.onPlatform((platform) => {
    const container = document.getElementById('checkboxContainer');
  
    // Clear any existing checkboxes
    container.innerHTML = '';

    const macList = ['brew', 'podman', 'podman-compose']
    const winList = ['WSL', 'Python', 'podman', 'podman-compose']


    // Define checkbox count and labels based on the platform
    const listItems = platform === 'darwin' ? macList : winList;
    const osType = platform === 'darwin' ? 'MacOS' : 'Windows';
  
    // Dynamically create checkboxes with labels for each platform

    for (let i = 0; i < listItems.length; i++) {
        
      const div = document.createElement('div');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `${osType}Checkbox${i}`;
      checkbox.disabled = true;  // Make checkbox non-interactive
  
      const span = document.createElement('span');
      span.innerText = `${listItems[i]}`;
  
      div.appendChild(checkbox);
      div.appendChild(span);
      container.appendChild(div);
    }
  });
  

// Listen for dependency statuses and update the checkboxes accordingly
window.electronAPI.onDependencyStatus((statuses) => {
    Object.entries(statuses).forEach(([dep, isInstalled], index) => {
      const checkbox = document.getElementById(`MacOSCheckbox${index + 1}`) || 
                       document.getElementById(`WindowsCheckbox${index + 1}`);
      
      if (checkbox) {
        checkbox.checked = isInstalled(`$dep} --version`);
      }
    });
  });