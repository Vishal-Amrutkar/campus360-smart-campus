import facultyData from "@/data/faculty.json";
import timetableData from "@/data/timetable.json";
import eventsData from "@/data/events.json";
import noticesData from "@/data/notices.json";
import configData from "@/data/config.json";

export class CampusAssistantProvider {
  static async ask(question: string): Promise<string> {
    const q = question.toLowerCase();

    // Intent: Timetable / Next Class
    if (q.includes("timetable") || q.includes("class do i have") || q.includes("next class")) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const now = new Date();
      const currentDay = days[now.getDay()];
      
      if (currentDay === "Sunday") {
        return "It's Sunday! There are no classes scheduled for today.";
      }

      const scheduleForDay = timetableData.schedule[currentDay as keyof typeof timetableData.schedule];
      if (!scheduleForDay) {
        return `I don't have the timetable for ${currentDay} right now.`;
      }

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let currentClass = null;
      let nextClass = null;

      for (const entry of scheduleForDay) {
        const [startH, startM] = entry.start.split(":").map(Number);
        const [endH, endM] = entry.end.split(":").map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;

        if (currentMinutes >= startTotal && currentMinutes < endTotal) {
          currentClass = entry;
        } else if (currentMinutes < startTotal && !nextClass) {
          nextClass = entry;
        }
      }

      if (q.includes("today")) {
        return `Today is ${currentDay}. You have ${scheduleForDay.filter(s => !s.is_recess).length} classes scheduled. Check the Timetable section for full details!`;
      }

      if (currentClass) {
        if (currentClass.is_recess) return "You are currently in Recess.";
        let response = `You currently have **${currentClass.subject}**`;
        if (currentClass.faculty_initials) {
          const faculty = facultyData.find(f => f.initials === currentClass.faculty_initials);
          if (faculty) response += ` with **${faculty.name}**`;
        }
        return response + ` until ${currentClass.end}.`;
      }

      if (nextClass) {
        return `Your next class is **${nextClass.subject}** at ${nextClass.start}.`;
      }

      return "You have no more classes scheduled for today!";
    }

    // Intent: Location (e.g. MCA class)
    if (q.includes("where") || q.includes("location")) {
      if (q.includes("mca")) {
        return "MCA classes are currently scheduled on the **3rd floor**.";
      }
      return "I only have location information for MCA classes right now (3rd floor).";
    }

    // Intent: Faculty Query
    if (q.includes("who teaches") || q.includes("teacher") || q.includes("professor") || q.includes("who is prof")) {
      if (q.includes("dsa")) {
        return "**Prof. Milind Deshkar** teaches Data Structures & Algorithms (DSA).";
      }
      
      for (const faculty of facultyData) {
        if (q.includes(faculty.name.toLowerCase().split(' ')[1]) || q.includes(faculty.name.toLowerCase())) {
          return `**${faculty.name}** teaches ${faculty.subjects.join(", ")}.` + (faculty.role ? ` They are also the ${faculty.role}.` : "");
        }
        for (const subject of faculty.subjects) {
          if (q.includes(subject.toLowerCase())) {
            return `**${faculty.name}** teaches ${subject}.`;
          }
        }
      }
      return "I'm not sure who teaches that subject. Check the Faculty directory!";
    }

    // Intent: Events
    if (q.includes("event")) {
      if (eventsData.length === 0) return "There are currently no events scheduled on campus.";
      return `We have an event coming up: **${eventsData[0].title}** on ${new Date(eventsData[0].date).toLocaleDateString()}.`;
    }

    // Intent: Notices
    if (q.includes("notice")) {
      if (noticesData.length === 0) return "There are no new notices right now.";
      return `The latest notice is: **${noticesData[0].title}**.`;
    }

    // Intent: RPSS
    if (q.includes("rpss") || q.includes("president") || q.includes("society")) {
      return `RPSS is the Student Society. The President is **${configData.rpss.president}**.`;
    }

    // Intent: Clubs
    if (q.includes("club")) {
      return `There are 10 student clubs on campus, including the **Technical Club**, **Cultural Club**, and more. You can view all of them in the Clubs section!`;
    }

    // Intent: Principal/HOD
    if (q.includes("principal")) return `The Principal is **${configData.principal}**.`;
    if (q.includes("hod")) return `The HOD is **${configData.hod}**.`;

    return "I don't have that information yet. Try asking about your timetable, faculty, or campus events!";
  }
}
