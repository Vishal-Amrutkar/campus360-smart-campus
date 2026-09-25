import facultyData from "@/data/faculty.json";
import timetableData from "@/data/timetable.json";
import eventsData from "@/data/events.json";
import noticesData from "@/data/notices.json";
import configData from "@/data/config.json";

export class CampusAssistantProvider {
  static async ask(question: string): Promise<string> {
    const q = question.toLowerCase();

    // Intent: Location (e.g. MCA class)
    if (q.includes("where") || q.includes("location") || q.includes("room")) {
      if (q.includes("mca")) {
        return "MCA classes are currently scheduled on the **3rd floor**.";
      }
      return "I only have location information for MCA classes right now (3rd floor).";
    }

    // Intent: Timetable / Next Class
    if (q.includes("timetable") || q.includes("schedule") || q.includes("class do i have") || q.includes("next class") || (q.includes("class") && (q.includes("now") || q.includes("today") || q.includes("currently") || q.includes("which")))) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const now = new Date();
      let targetDay = days[now.getDay()];

      // Check if user is asking for a specific day
      if (q.includes("tomorrow")) {
        targetDay = days[(now.getDay() + 1) % 7];
      } else {
        const lowerDays = days.map(d => d.toLowerCase());
        for (const day of lowerDays) {
          if (q.includes(day)) {
            targetDay = day.charAt(0).toUpperCase() + day.slice(1);
            break;
          }
        }
      }
      
      if (targetDay === "Sunday") {
        return `It's Sunday! There are no classes scheduled for ${targetDay.toLowerCase() === days[now.getDay()].toLowerCase() ? 'today' : targetDay}.`;
      }

      const scheduleForDay = timetableData.schedule[targetDay as keyof typeof timetableData.schedule];
      if (!scheduleForDay) {
        return `I don't have the timetable for ${targetDay} right now.`;
      }

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let currentClass = null;
      let nextClass = null;

      // Only calculate current/next if asking for today
      const isToday = targetDay === days[now.getDay()];

      for (const entry of scheduleForDay) {
        const [startH, startM] = entry.start.split(":").map(Number);
        const [endH, endM] = entry.end.split(":").map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;

        if (isToday) {
          if (currentMinutes >= startTotal && currentMinutes < endTotal) {
            currentClass = entry;
          } else if (currentMinutes < startTotal && !nextClass) {
            nextClass = entry;
          }
        }
      }

      // Check for specific "now" or "current" queries first
      if (q.includes("now") || q.includes("current") || q.includes("going on") || q.includes("present") || q.includes("which class")) {
        if (currentClass) {
          if (currentClass.is_recess) return "You are currently in Recess.";
          let response = `Right now, you have **${currentClass.subject}**`;
          if (currentClass.faculty_initials) {
            const faculty = facultyData.find(f => f.initials === currentClass.faculty_initials);
            if (faculty) response += ` with **${faculty.name}**`;
          }
          return response + ` until ${currentClass.end}.`;
        } else if (nextClass) {
          return `You don't have a class right now. Your next class is **${nextClass.subject}** at ${nextClass.start}.`;
        } else {
          return "You have no more classes for today!";
        }
      }

      if (q.includes("next") || q.includes("upcoming") || q.includes("after this")) {
         if (nextClass) {
           return `Your next class is **${nextClass.subject}** at ${nextClass.start}.`;
         }
         return "You have no more classes scheduled for today!";
      }

      // Default for "timetable", "today", "schedule"
      const currentTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const scheduleString = scheduleForDay.map(s => {
        const subject = s.is_recess ? "Recess" : s.subject;
        return `- ${s.start} to ${s.end}: **${subject}**`;
      }).join("\n");
      
      return `Here is the schedule for **${targetDay}**${isToday ? ` (Current time: ${currentTimeString})` : ''}:\n${scheduleString}`;
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
