import Icone from "@/components/Icone";
import MolduraRecorte from "@/components/MolduraRecorte";
import { OvelhaRegistrada } from "@/data/conteudos";

interface CardFichaOvelhaProps {
  animal: OvelhaRegistrada;
  ehRecente: boolean;
  onAlternarVacina: (id: string) => void;
  onRemover: (id: string) => void;
}

export default function CardFichaOvelha({
  animal,
  ehRecente,
  onAlternarVacina,
  onRemover,
}: CardFichaOvelhaProps) {
  const vacinaOk = animal.vacinacao === "Em dia";

  return (
    <article
      className={`bg-amarelo-card rounded-[2.2rem] p-6 sombra-pop flex flex-col justify-between relative transition-all duration-300 border-[3px] ${
        ehRecente
          ? "border-rosa ring-4 ring-rosa/25 animate-pop-up"
          : "border-rosa/15 hover:-translate-y-1 hover:border-rosa/50"
      }`}
    >
      <div>
        {/* Topo da Ficha: Brinco + Botão de Status de Vacina */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
            <Icone nome="tag" className="w-3.5 h-3.5" />
            <span>{animal.brinco}</span>
          </span>

          <button
            type="button"
            onClick={() => onAlternarVacina(animal.id)}
            title="Clique para alternar o status da vacinação"
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              vacinaOk
                ? "bg-papel text-rosa border-rosa/30 hover:bg-white"
                : "bg-white text-rosa border-dashed border-rosa hover:bg-papel"
            }`}
          >
            <Icone
              nome={vacinaOk ? "shield-check" : "shield-alert"}
              className="w-3.5 h-3.5"
            />
            <span>Vacina: {animal.vacinacao}</span>
          </button>
        </div>

        {/* Moldura de recorte reutilizável */}
        <MolduraRecorte
          tamanhoPonto="sm"
          mostrarPontosLaterais={false}
          className="bg-white/40 mb-4"
        >
          <img
            src={animal.foto}
            alt={`Ovelha ${animal.nome}`}
            className="w-full h-44 object-cover"
          />
        </MolduraRecorte>

        {/* Nome e Categoria */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <h3 className="text-3xl font-serif text-amarelo italic leading-none texto-contorno-rosa-sm">
            {animal.nome}
          </h3>
          <span className="text-xs font-extrabold text-rosa bg-papel/85 px-2.5 py-0.5 rounded-full border border-rosa/20">
            {animal.categoria} • {animal.pelagem}
          </span>
        </div>

        {/* Métricas Zootécnicas */}
        <div className="grid grid-cols-2 gap-2 bg-papel/90 rounded-2xl p-3 mb-3 border border-rosa/15">
          <div className="flex items-center gap-2">
            <Icone nome="scale" className="w-4 h-4 text-rosa" />
            <div>
              <p className="text-[10px] font-bold text-black/60 leading-none">
                Peso
              </p>
              <p className="text-sm font-black text-rosa">{animal.pesoKg} kg</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Icone nome="droplets" className="w-4 h-4 text-rosa" />
            <div>
              <p className="text-[10px] font-bold text-black/60 leading-none">
                Produção
              </p>
              <p className="text-sm font-black text-rosa">
                {animal.producaoLitros} L/dia
              </p>
            </div>
          </div>
        </div>

        <p className="text-black/80 text-xs sm:text-sm font-medium leading-relaxed">
          {animal.observacao}
        </p>
      </div>

      {/* Rodapé da Ficha */}
      <div className="flex justify-end items-center mt-4 pt-2 border-t border-black/10">
        <button
          type="button"
          onClick={() => onRemover(animal.id)}
          aria-label={`Remover registro de ${animal.nome}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-rosa/75 hover:text-rosa hover:underline"
        >
          <Icone nome="trash-2" className="w-3.5 h-3.5" />
          <span>Remover ficha</span>
        </button>
      </div>
    </article>
  );
}
