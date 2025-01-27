import {createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://vxtkzbqgrtmfldgycgnx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dGt6YnFncnRtZmxkZ3ljZ254Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjg5NDk1OSwiZXhwIjoyMDUyNDcwOTU5fQ._KliDAQgkdSX7ebi3G9Kizzex7rXBeLM_HLhBqAmw7s";
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabaseKey, supabaseUrl);

async function capturarDados() {
  const inputValue = document.getElementById("city_name").value;

  if (!inputValue) {
    alert("Você precisa inserir uma cidade!");
    return;
  }

  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;

    console.log(`IP do usuário: ${userIP}`);
    console.log(`Valor inserido: ${inputValue}`);

    const {data, error} = await supabase
      .from("user_data")
      .insert([{ip: userIP, input_value: inputValue}]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar os dados!");
    } else {
      console.log("Dados salvos com sucesso:", data);
      alert("Dados salvos com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao capturar IP:", error);
    alert("Não foi possível capturar o IP.");
  }
}

document.getElementById("search").addEventListener("submit", async (event) => {
  event.preventDefault();

  await capturarDados();
});
