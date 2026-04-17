import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What is bulk sms service?",
    answer:
      "A bulk SMS service is a communication platform that allows businesses to send a large number of text messages to a wide audience simultaneously. It is an effective tool for marketing, notifications, and customer engagement, enabling you to reach thousands of people instantly. Our service offers both affordable SMS pricing plans and high-reliability premium SMS routes.",
  },
  {
    question: "How does SMS API Integration work?",
    answer:
      "Our SMS API allows you to connect your own applications, software, or CRM to our messaging platform. This enables you to automate sending and receiving messages, check delivery reports, and manage contacts programmatically. We provide detailed developer documentation to make the integration process quick and straightforward.",
  },
  {
    question: "What is bulk sms service?",
    answer:
      "A bulk SMS service is a communication platform that allows businesses to send a large number of text messages to a wide audience simultaneously. It is an effective tool for marketing, notifications, and customer engagement, enabling you to reach thousands of people instantly. Our service offers both affordable SMS pricing plans and high-reliability premium SMS routes.",
  },
  {
    question: "How does SMS API Integration work?",
    answer:
      "Our SMS API allows you to connect your own applications, software, or CRM to our messaging platform. This enables you to automate sending and receiving messages, check delivery reports, and manage contacts programmatically. We provide detailed developer documentation to make the integration process quick and straightforward.",
  },
];

const Faq = () => {
  return (
    <div className="container bg-black text-white mx-auto max-w-4xl py-12 px-8 sm:px-6 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-foreground/90">
          Find answers to common questions about medical laboratory tests.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="bg-black/50 rounded-lg mb-4 px-4 shadow-sm hover:bg-white transition-colors"
          >
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-black/80">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
