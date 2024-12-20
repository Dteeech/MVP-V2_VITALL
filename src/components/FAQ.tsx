import React from 'react';

const faqs = [
  {
    question: "Quelles sont les conditions pour devenir pompier ?",
    answer: "Pour devenir pompier, vous devez être âgé d'au moins 18 ans, être de nationalité française ou européenne, être en bonne condition physique et avoir un casier judiciaire vierge."
  },
  {
    question: "Comment se déroule le processus de recrutement ?",
    answer: "Le processus comprend plusieurs étapes : dépôt de candidature, tests physiques, examens médicaux, tests psychotechniques et entretien de motivation."
  },
  {
    question: "Quelle formation dois-je suivre ?",
    answer: "Une formation initiale de plusieurs mois est obligatoire. Elle comprend des aspects théoriques et pratiques du métier de pompier."
  }
];

export function FAQ() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}