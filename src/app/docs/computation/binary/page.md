---
title: Introduction to Binary
nextjs:
  metadata:
    title: Introduction to Binary
    description: TBD.
---


## 1. What is Binary?
As we learned in the previous sections, computers use a series of switches to represent information and perform computations. This means that computers require that data and instructions be encoded in terms of switches, where 1 symbolizes "on" and 0 symbolizes "off."

{% light-switch value=1 width=80 /%}

This is the idea of **binary**: representing information and ideas as a series of on/off switches, or 1s and 0s. This my sound complicated, but it's simpler than you think. For instance, let's say that you and your friend Walter wanted to represent the numbers 0-5 using a series of on/off switches. Walter proposes that the number 5 can be represented by 5 switches turned to "on", that the number 4 could be represented as 4 switches turned to "on", and so forth.

### Walter's System
{% light-switches values=[1, 1, 1, 1, 1] label="5" /%}
{% light-switches values=[1, 1, 1, 1] label="4" /%}
{% light-switches values=[1, 1, 1] label="3" /%}
{% light-switches values=[1, 1] label="2" /%}
{% light-switches values=[1] label="1" /%}
{% light-switches values=[] label="0" /%}

If you and Walter both agree that this is how number encodings should work, then you have invented a system of binary that can encode numbers. However, this may not be *the best* system. Can you think of any problems with it?

### Potential Problems with Walter's System:
Over time, you may begin to appreciate some of the challenges that accompany Walter's system of binary encodings. For instance:
* If zero is represented by no switches, how do you even know if there is a zero being represented?
* How would you represent the number 999,999,999? Would that number require that you have nearly a billion switches available?

You may be starting to appreciate that some systems of binary encodings are more efficient and more correct than others. In fact, people have spent a lot of time thinking about the best way to encode different kinds of information accurately and efficiently, taking inspiration from existing systems of formally representing concepts, particularly mathematics. 

## Decimal and Binary Representations of Whole Numbers [Start Here]
and, 

        {% light-switches values=[1, 0, 1, 0, 1, 1, 0, 0] center=true /%}


In this section we'll be focusing on how to represent and manipulate numbers using binary. 

## 2. Converting Between Decimal and Binary


### Binary to Decimal
Some introductory text  for the conversion + a lesson

{% binary-conversion /%}

--- 

### Decimal to Binary
TODO

## 3. Doing Binary Arithmetic
Text text text...

## 4. Other Encodings
Humans have in fact invented many different systems for encoding and decoding different types of information into binary[1] -- not just whole numbers.

---

## References

### Videos
* [Intro to Binary](https://www.youtube.com/watch?v=zDNaUi2cjv4) (2:27)
* [Binary to Decimal Formula](https://www.youtube.com/watch?v=Aw6wd_WE-n8) (1:22)
* [Decimal to Binary Formula](https://www.youtube.com/watch?v=1TxAm9931TE) (2:06)
* [Converting Binary to Decimal](https://www.youtube.com/watch?v=RrJXLdv1i74) (22:15)

### Representing ideas in binary
Just a few examples of how you can use binary to represent letters, colors, and more. 
* [Letters in Binary](https://www.phys.uconn.edu/~rozman/Courses/P2200_13F/downloads/ascii.pdf)
* [Colors represented in 8-bit number channels](https://www.rapidtables.com/web/color/RGB_Color.html)


## Footnotes
[1] Each kind of data can have it's own way of representing information in binary. For instance, letters might use a system called [ASCII](#) or [UTF8](#), and images might use something called a [bitmap](#) -- more on that later.
