
function generateCupcake(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
      </li>
      <button class="delete-cake">Delete</button>
      <img class="Cupcake-img" 
           style="max-width:100px;width:100px"
           src="${cupcake.image}">
    </div>
  `;
}


async function showInitialCupcakes() {
  const response = await axios.get(`http://localhost:5000/api/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcake(cupcakeData));
    $("#cupcakes-ul").append(newCupcake);
  }
}


$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const newCupcakeResponse = await axios.post(`http://localhost:5000/api/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });

  let cupCake = $(generateCupcake(newCupcakeResponse.data.cupcake));
  $("#cupcakes-ul").append(cupCake);
  $("#new-cupcake-form").trigger("reset");
});


$("#cupcakes-ul").on("click", ".delete-cake", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`http://localhost:5000/api/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});


$(showInitialCupcakes);