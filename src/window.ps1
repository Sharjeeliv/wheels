# Check the current PowerShell version
$PSVersion = $PSVersionTable.PSVersion
Write-Output "Current PowerShell version: $($PSVersion.Major).$($PSVersion.Minor)"
Write-Output "Checking Windows version compatibility for WSL 2..."

# Check Windows version for WSL 2 compatibility
$releaseId = (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'ReleaseId').ReleaseId
$buildNumber = (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'CurrentBuild').CurrentBuild

Write-Output "Windows Build Number: $buildNumber (Release ID: $releaseId)"

# WSL 2 requires Windows 10 version 2004 or higher (Release ID 2004 or higher)
if ($releaseId -lt 2004) {
    Write-Output "WSL 2 requires Windows 10 version 2004 or later. Exiting..."
    exit
} else {
    Write-Output "Windows version supports WSL 2. Proceeding with installation..."
}

# Enable Windows Subsystem for Linux
Write-Output "Enabling Windows Subsystem for Linux..."
Start-Process -NoNewWindow -Wait -FilePath dism.exe -ArgumentList "/online", "/enable-feature", "/featurename:Microsoft-Windows-Subsystem-Linux", "/all", "/norestart"

# Enable Virtual Machine Platform (required for WSL 2)
Write-Output "Enabling Virtual Machine Platform..."
Start-Process -NoNewWindow -Wait -FilePath dism.exe -ArgumentList "/online", "/enable-feature", "/featurename:VirtualMachinePlatform", "/all", "/norestart"

# Set WSL 2 as the default version if WSL is already installed
Write-Output "Setting WSL 2 as the default version..."
wsl --set-default-version 2

Write-Output "WSL 2 setup complete. Please restart your computer to apply changes."
