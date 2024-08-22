using PrimeiraApi.Models;

namespace PrimeiraApi.Rotas;


public static class PessoaRotas
{
    public static List<Pessoa> Pessoas = new List<Pessoa>() 
    { 
        new Pessoa(id:Guid.NewGuid(),nome:"Neymar"),
        new Pessoa(id:Guid.NewGuid(),nome:"Cristiano"),
        new Pessoa(id:Guid.NewGuid(),nome:"Messi")
    };

    public static void MapPessoaRotas(this WebApplication app)
    {
        app.MapGet(pattern:"/pessoas", handler:() => Pessoas);

        app.MapGet(pattern:"/pessoas/{nome}",
            handler:(string nome) => Pessoas.Find(x => x.Nome.StartsWith(nome)));

        app.MapPost(pattern:"/pessoas",
            handler:(HttpContext request, Pessoa pessoa) =>
            {    
                pessoa.Id = Guid.NewGuid();
                Pessoas.Add(pessoa);
                return Results.Ok(pessoa);                
            });

        app.MapPut(pattern:"/pessoa/{id}", handler:(Guid id, Pessoa pessoa) =>
        {
            var encontrado = Pessoas.Find(x => x.Id == id) ?? default(Pessoa);

            if (encontrado == null)
               return Results.NotFound();

            encontrado.Nome = pessoa.Nome;

            return Results.Ok(encontrado);

        });
    }
}