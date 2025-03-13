export async function fetchTestLogic(): Promise<string> {
  try {
    console.log("Variables d'environnement Vite:", import.meta.env);

    const API_URL = import.meta.env?.VITE_API_URL ?? "http://localhost:3333";
    console.log("API_URL utilisé:", API_URL);

    const response = await fetch(`${API_URL}/api/test`);
    console.log("Réponse brute de l'API:", response);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");

    const text = await response.text();
    console.log("Texte brut reçu:", text);

    try {
      const data = JSON.parse(text);
      return data.message;
    } catch (parseError) {
      console.error("Erreur lors du parsing JSON:", parseError);
      return "Réponse API invalide";
    }
  } catch (error) {
    console.error("Erreur API:", error);
    return "Erreur lors de l'appel API";
  }
}
