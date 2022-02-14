export interface Todo {
    id: string;
    medicine: string;
    description: string;
    done: boolean;
    
    //An welchen Tagen soll die Medizin konsumiert werden? z.B. Mo,Mi,Fr,So
    consumption_day: Date | null;

    //Bis wann wird das Medikament eingenommen z.B. zwei Wochen
    consumption_date: string;

    //Wie oft wird das Präperat pro Tag eingenommen
    consumption_times : number;
    
}
