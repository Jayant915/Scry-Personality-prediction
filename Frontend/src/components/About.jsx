import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Brain, Eye, Zap, Shield, BookOpen, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="px-4 sm:px-10 lg:px-12 py-18 space-y-18"> 
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
          About Scry
        </h1>
        <p className="text-lg sm:text-xl text-slate-600">
          Learn how our AI-powered system analyzes handwriting to predict personality traits
          using advanced machine learning and graphology principles.
        </p>
      </div>

      {/* Hero Card */}
      <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="text-center">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-white mb-3">Advanced AI Technology</h2>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Our system combines machine learning algorithms with graphology research to provide
            insights into personality traits based on handwriting characteristics.
          </p>
        </div>
      </Card>

      {/* How It Works & Features */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* How It Works */}
        <Card className="p-6 bg-white border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-600" />
            <h3 className="text-purple-900">How It Works</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <p className="text-slate-900">Input Handwriting</p>
                <p className="text-slate-600 text-sm">Draw or upload a sample of your handwriting</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <p className="text-slate-900">AI Analysis</p>
                <p className="text-slate-600 text-sm">ML algorithms analyze slant, pressure, spacing, and size</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <p className="text-slate-900">Personality Prediction</p>
                <p className="text-slate-600 text-sm">Get insights based on the Big Five personality model</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Features Analyzed */}
        <Card className="p-6 bg-white border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-purple-600" />
            <h3 className="text-purple-900">Features We Analyze</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-purple-700">Slant Angle</p>
              <p className="text-slate-600 text-sm">Writing direction</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-purple-700">Pressure</p>
              <p className="text-slate-600 text-sm">Pen force</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-purple-700">Letter Size</p>
              <p className="text-slate-600 text-sm">Overall scale</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-purple-700">Spacing</p>
              <p className="text-slate-600 text-sm">Word gaps</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Big Five Traits */}
      <Card className="p-6 bg-white border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-purple-900">Big Five Personality Traits</h2>
            <p className="text-slate-600 text-sm">Understanding the personality dimensions</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-700">Openness</AccordionTrigger>
            <AccordionContent className="text-slate-600">Reflects imagination, creativity, and willingness to try new experiences.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-slate-700">Conscientiousness</AccordionTrigger>
            <AccordionContent className="text-slate-600">Measures organization, responsibility, and self-discipline.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-slate-700">Extraversion</AccordionTrigger>
            <AccordionContent className="text-slate-600">Indicates sociability and assertiveness.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-slate-700">Agreeableness</AccordionTrigger>
            <AccordionContent className="text-slate-600">Reflects cooperation and compassion.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-slate-700">Neuroticism</AccordionTrigger>
            <AccordionContent className="text-slate-600">Measures emotional stability.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Privacy & Accuracy */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Privacy */}
        <Card className="p-6 bg-white border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="text-purple-900">Privacy & Security</h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600">All analysis is performed locally on your device. Handwriting data stays on your browser.</p>
            </div>
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600">No information is sent to external servers. Your privacy is fully protected.</p>
            </div>
          </div>
        </Card>

        {/* Accuracy */}
        <Card className="p-6 bg-white border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600"/>
            <h3 className="text-purple-900">Accuracy & Usage</h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600">Results are based on ML and graphology research.</p>
            </div>
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-600">For best accuracy, provide natural handwriting with 2–3 complete sentences.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
