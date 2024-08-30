import java.util.Scanner;

public class Act2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        final double fruits = 50.00;
        final double vegetables = 30.00;
        final double dairy = 70.00;
        
        double totalCost = 0;
        double eachItem = 0;
        double totalItem = 0;
        
        System.out.print("Enter the number of different item types in your cart: ");
        int numItems = input.nextInt();
        
        for (int i = 0; i < numItems; i++) {
            System.out.println("Select item type for item " + (i + 1) + ": ");
            System.out.println("1. Fruits (PHP 50 per kilo)");
            System.out.println("2. Vegetables (PHP 30 per kilo)");
            System.out.println("3. Dairy (PHP 70 per unit)");
            int itemType = input.nextInt();
            
            System.out.print("Enter the number of items: ");
            eachItem = input.nextInt();

            double price = 0;
            
            if (itemType == 1) {
                price = fruits;
                System.out.println("You selected Fruits. Price: PHP 50 per kilo.");
            } else if (itemType == 2) {
                price = vegetables;
                System.out.println("You selected Vegetables. Price: PHP 30 per kilo.");
            } else if (itemType == 3) {
                price = dairy;
                System.out.println("You selected Dairy. Price: PHP 70 per unit.");
            } else {
                System.out.println("Invalid item type selected.");
                continue;
            }
            
            double itemCost = eachItem * price;
            totalCost += itemCost;
            totalItem += eachItem;
        }

        if (totalItem > 5) {
            totalCost = totalCost * 0.90;
            System.out.println("You have " + totalItem + " in your cart. A 10% discount have been applied. Your total amount without VAT is: PHP " + totalCost);
        }
        
        double vat = totalCost * 0.12;
        totalCost += vat;
        System.out.println("VAT has been added, your new total amount is: PHP " + totalCost);
        
        if (totalCost >= 2000) {
            totalCost = totalCost * 0.95;
            System.out.println("A 5% discount has been applied.");
        }
        System.out.println("Your total cost for all items is: PHP " + totalCost);
        
        input.close();
    }
}