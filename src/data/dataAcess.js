import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { data, error } = await supabase
      .from("user_data")
      .insert([{ ip: userIP, input_value: inputValue }]);

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
