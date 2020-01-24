
// footer
let devs = ["Dut", "Havi", "Kymmi"];
let footerText = `<footer><p>
  &copy; ${(new Date()).getFullYear()}.
  'Lovinguly' crafted in Chicago, IL by <span class="highlight">${devs.join(", ")}</span>.
</p></footer>
`;

document.body.insertAdjacentHTML("beforeend", footerText);


