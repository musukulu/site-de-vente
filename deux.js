let panier = [];

document.addEventListener('DOMContentLoaded', () => {
  const boutonsPanier = document.querySelectorAll('.emoji-panier');
  boutonsPanier.forEach(btn => {
    btn.addEventListener('click', () => {
      const carte = btn.closest('.carte-produit');
      const nom = carte.querySelector('h3').innerText;
      const prix = parseFloat(carte.querySelector('.prix').innerText);
      panier.push({ nom, prix });
      afficherPanier();
    });
  });

  document.getElementById('lien-panier').addEventListener('click', () => {
    document.getElementById('catalogue').style.display = 'none';
    document.getElementById('zone-panier').style.display = 'block';
    document.getElementById('formulaire-livraison').style.display = 'none';
  });

  document.getElementById('btn-valider').addEventListener('click', () => {
    document.getElementById('zone-panier').style.display = 'none';
    document.getElementById('formulaire-livraison').style.display = 'block';
  });
});

function afficherPanier() {
  const liste = document.getElementById('liste-panier');
  const totalEl = document.getElementById('total-panier');
  liste.innerHTML = '';
  let total = 0;
  panier.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nom} - ${item.prix.toFixed(2)} $`;
    liste.appendChild(li);
    total += item.prix;
  });
  totalEl.innerText = `Total : ${total.toFixed(2)} $`;
}
