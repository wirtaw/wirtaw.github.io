document.querySelectorAll('pre').forEach(pre => {
  const button = document.createElement('button');
  button.className = 'copy-button';
  button.textContent = 'Copy';
  button.addEventListener('click', async () => {
    const code = pre.querySelector('code').textContent;
    await navigator.clipboard.writeText(code);
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy', 2000);
  });
  pre.style.position = 'relative';
  pre.appendChild(button);
});