
// footer
let devs = ["Dut", "Havi", "Kymmi"];
let footerText = `<footer><p>
  &copy; ${(new Date()).getFullYear()}.
  '<span class="red">Lovinguly</span>' crafted in Chicago, IL by <span class="highlight">${devs.join(", ")}</span>.
</p></footer>
`;
document.body.insertAdjacentHTML("beforeend", footerText);

// hiding the credentials form
document.querySelector("#close-creds-btn").addEventListener("click", () => {
  document.querySelector(".login-wrap").classList.toggle("hide");
});


