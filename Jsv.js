let panier = [];

document.addEventListener('DOMContentLoaded', () => {
  // Ajouter au panier
  document.querySelectorAll('.btn-panier').forEach(btn => {
    btn.addEventListener('click', () => {
      const carte = btn.closest('.carte-produit');
      const nom = carte.querySelector('h3').innerText;
      const prix = parseFloat(carte.querySelector('.prix').innerText);
      panier.push({ nom, prix });
      afficherNotification(`${nom} a été ajouté à votre panier !`);
      afficherPanier();
    });
  });

  // Afficher zone panier
  document.getElementById('lien-panier').addEventListener('click', () => {
    document.querySelector('.catalogue').style.display = 'none';
    document.getElementById('zone-panier').style.display = 'block';
    document.getElementById('formulaire-livraison').style.display = 'none';
    afficherPanier();
  });

  // Aller au formulaire
  document.getElementById('valider-panier').addEventListener('click', () => {
    document.getElementById('zone-panier').style.display = 'none';
    document.getElementById('formulaire-livraison').style.display = 'block';
  });
});

// Affichage du panier
function afficherPanier() {
  const liste = document.getElementById('liste-panier');
  const totalEl = document.getElementById('total-panier');
  liste.innerHTML = '';
  let total = 0;

  panier.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nom} - ${item.prix.toFixed(2)} $ <span class="supprimer-item" onclick="supprimerItem(${index})">X</span>`;
    liste.appendChild(li);
    total += item.prix;
  });

  totalEl.innerText = `Total : ${total.toFixed(2)} $`;
}

// Supprimer un article du panier
function supprimerItem(index) {
  panier.splice(index, 1);
  afficherPanier();
}
function afficherNotification(message) {
  const notif = document.getElementById('notification-panier');
  notif.innerText = message;
  notif.style.display = 'block';

  setTimeout(() => {
    notif.style.display = 'none';
  }, 2500); // Disparaît après 2.5 secondes
}
// Recherche dynamique
document.getElementById('champ-recherche').addEventListener('input', function () {
  const filtre = this.value.toLowerCase();
  const produits = document.querySelectorAll('.carte-produit');

  produits.forEach(produit => {
    const nom = produit.querySelector('h3').innerText.toLowerCase();
    if (nom.includes(filtre)) {
      produit.style.display = 'block';
    } else {
      produit.style.display = 'none';
    }
  });
});
document.querySelector('#form-commande').addEventListener('submit', function (e) {
  e.preventDefault(); // empêcher l’envoi

  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const pays = document.getElementById('pays').value;
  const adresse = document.getElementById('adresse').value;
  const ville = document.getElementById('ville').value;
  const telephone = document.getElementById('telephone').value;
  const email = document.getElementById('email').value;

  let message = `📦 Nouvelle commande !\n\n`;
  panier.forEach(p => {
    message += `🖥️ ${p.nom} - ${p.prix.toFixed(2)} $\n`;
  });
  message += `\n💰 Total: ${panier.reduce((s, p) => s + p.prix, 0).toFixed(2)} $\n\n`;
  message += `👤 Client : ${prenom} ${nom}\n📍 Adresse : ${adresse}, ${ville}, ${pays}\n📞 Téléphone : ${telephone}\n📧 Email : ${email}`;

  const whatsappURL = `https://wa.me/243818540504?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
});

// Réinitialiser le panier;

