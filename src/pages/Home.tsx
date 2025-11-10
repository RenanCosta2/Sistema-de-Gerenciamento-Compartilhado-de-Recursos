import React from "react";

const Home: React.FC = () => {
  return (
    <section className="pt-24">
      <h2 className="text-4xl font-bold mb-6 text-indigo-400">Bem-vindo ao SGCR</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        Este sistema visa o gerenciamento compartilhado de recursos entre diferentes setores
        e usuários, permitindo controle, transparência e eficiência no uso de ativos comuns.
      </p>
    </section>
  );
};

export default Home;
