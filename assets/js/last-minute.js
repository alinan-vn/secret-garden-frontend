
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

// temporarily hide 'remove' buttons from bookcase listing page
function hideButtons() {
  let btns = document.querySelectorAll("button.remove-button");
  for (let btn of btns) {
    btn.style.display = "none";
  }
}


